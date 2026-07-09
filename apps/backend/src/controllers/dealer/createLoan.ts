import type { Request, Response } from "express";
import { prisma } from "../../db";
import { CreateLoanSchema } from "../../common/types";

export const createLoan = async (req: Request, res: Response) => {
  const parsed = CreateLoanSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      message: parsed.error.issues[0]?.message,
    });
  }

  try {
    const {
      customerId,
      deviceSaleId,
      totalAmount,
      downPayment,
      tenureMonths,
      interestRate = 0, // e.g., 12 for 12% flat rate per annum
    } = parsed.data;

    // 1. Verify Dealer & Sale Ownership
    const dealer = await prisma.dealer.findUnique({ where: { userId: req.user!.userId } });
    if (!dealer) return res.status(404).json({ message: "Dealer not found" });

    const sale = await prisma.deviceSale.findFirst({
      where: { id: deviceSaleId, customerId, dealerId: dealer.id },
    });
    if (!sale) return res.status(404).json({ message: "Device sale not found" });

    // 2. Check for Duplicate Loan
    const existingLoan = await prisma.loan.findUnique({ where: { deviceSaleId } });
    if (existingLoan) return res.status(409).json({ message: "Loan already exists" });

    // 3. Financial Calculations (Flat Rate Method)
    const financedAmount = totalAmount - downPayment;
    
    // Total Interest = Principal * (Rate / 100) * (Years)
    const totalInterest = financedAmount * (interestRate / 100) * (tenureMonths / 12);
    const totalPayable = financedAmount + totalInterest;
    
    // Monthly EMI is fixed and equal for all months
    let monthlyEmi = totalPayable / tenureMonths;
    monthlyEmi = Math.round(monthlyEmi * 100) / 100; // Round cleanly to 2 decimal places

    const loanStartDate = new Date();

    // 4. Transaction Block
    const result = await prisma.$transaction(async (tx) => {
      const loan = await tx.loan.create({
        data: {
          customerId,
          deviceSaleId,
          totalAmount,
          downPayment,
          financedAmount,
          tenureMonths,
          monthlyEmi, // Stores flat rate EMI
          startDate: loanStartDate,
        },
      });

      const emis = [];

      for (let i = 1; i <= tenureMonths; i++) {
        const dueDate = new Date(loanStartDate);
        dueDate.setMonth(loanStartDate.getMonth() + i);

        // Month-end edge-case handling (e.g., Jan 31st moves safely to Feb 28th/29th)
        if (dueDate.getDate() !== loanStartDate.getDate()) {
          dueDate.setDate(0);
        }

        // Adjusting the final month for any fractional rounding differences
        let currentEmiAmount = monthlyEmi;
        if (i === tenureMonths) {
          const totalPaidBeforeLast = monthlyEmi * (tenureMonths - 1);
          currentEmiAmount = Math.round((totalPayable - totalPaidBeforeLast) * 100) / 100;
        }

        emis.push({
          loanId: loan.id,
          installmentNumber: i,
          dueDate,
          amount: currentEmiAmount, // Populates exact schema "amount"
        });
      }

      await tx.emi.createMany({ data: emis });
      return loan;
    });

    return res.status(201).json({
      message: "Loan created successfully",
      loan: result,
      totalEmisCreated: tenureMonths,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};