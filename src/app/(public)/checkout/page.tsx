"use client";

import { useState } from "react";
import { Details } from "./components/details";
import PaymentForm from "./components/payment-form";

export interface PlanProps {
  creditCardPrice: number;
  description: string;
  id: string;
  name: string;
  pixPrice: number;
  yearlyDiscount: number;
  userQuantity: number;
}

export default function Checkout() {
  const [couponCode, setCouponCode] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponApplied, setCouponApplied] = useState(false);
  const [discountPercent, setDiscountPercent] = useState<number | null>(null);
  const [plans, setPlans] = useState<PlanProps[]>([
    {
      creditCardPrice: 0,
      description: "teste",
      id: "teste",
      name: "teste",
      pixPrice: 0,
      yearlyDiscount: 0,
      userQuantity: 0,
    },
  ]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>("card");

  return (
    <>
      <div className="m-6 min-h-[calc(100svh-3rem)] rounded-md bg-neutral-900 p-4 xl:p-8">
        <div className="mx-auto max-w-[58.25rem]">
          <div className="text-2xl font-bold">Checkout</div>
          <div className="font-semibold text-neutral-600">
            Realize o pagamento
          </div>
          <div className="relative mt-2 flex flex-col items-center justify-between border-t border-t-neutral-500 pt-4 md:mt-10 md:border-t md:pt-4 lg:mt-6 xl:flex-row">
            <div className="w-full max-w-[20.375rem] lg:mb-8">
              <Details
                plans={plans}
                selectedPaymentMethod={selectedPaymentMethod}
                couponCode={couponCode}
                setCouponCode={setCouponCode}
                couponLoading={couponLoading}
                setCouponLoading={setCouponLoading}
                couponApplied={couponApplied}
                setCouponApplied={setCouponApplied}
                discountPercent={discountPercent}
                setDiscountPercent={setDiscountPercent}
              />
            </div>
            <div className="w-full max-w-[29.875rem] xl:w-[29rem]">
              <PaymentForm
                plans={plans}
                selectedPaymentMethod={selectedPaymentMethod}
                setSelectedPaymentMethod={setSelectedPaymentMethod}
                couponCode={couponCode}
                setCouponCode={setCouponCode}
                couponLoading={couponLoading}
                setCouponLoading={setCouponLoading}
                couponApplied={couponApplied}
                setCouponApplied={setCouponApplied}
                discountPercent={discountPercent}
                setDiscountPercent={setDiscountPercent}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
