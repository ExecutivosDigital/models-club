"use client";

import { useApiContext } from "@/context/ApiContext";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Details } from "./components/details";
import PaymentForm from "./components/payment-form";

export interface PlanProps {
  creditValue: number;
  description: string;
  id: string;
  name: string;
  pixValue: number;
  yearlyDiscount: number;
  userQuantity: number;
}

export default function Checkout() {
  const { GetAPI } = useApiContext();
  const { id } = useParams<{ id: string }>();
  const [couponCode, setCouponCode] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponApplied, setCouponApplied] = useState(false);
  const [discountPercent, setDiscountPercent] = useState<number | null>(null);

  const [selectedPlan, setSelectedPlan] = useState<PlanProps | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>("card");

  async function GetPlans() {
    const plans = await GetAPI("/signature-plan", true);
    if (plans.status === 200) {
      setSelectedPlan(plans.body.plans.find((plan: any) => plan.id === id));
    }
  }

  useEffect(() => {
    GetPlans();
  }, []);

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
                plans={selectedPlan}
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
                plans={selectedPlan}
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
