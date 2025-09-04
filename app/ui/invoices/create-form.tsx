"use client";

import { useFormState } from "react-dom"; // Next.js Server Actions
import { createInvoice, State } from "@/app/lib/actions";
import { CustomerField } from "@/app/lib/definitions";
import { Button } from "@/app/ui/button";

interface Props {
  customers: CustomerField[];
}

export default function Form({ customers }: Props) {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useFormState(createInvoice, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-4 max-w-md">
      {/* Customer */}
      <label className="flex flex-col gap-1">
        Customer
        <select name="customerId" className="border p-2 rounded w-full">
          <option value="">Select a customer</option>
          {customers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        {state.errors?.customerId && (
          <p className="text-red-500">{state.errors.customerId.join(", ")}</p>
        )}
      </label>

      {/* Amount */}
      <label className="flex flex-col gap-1">
        Amount
        <input
          type="number"
          name="amount"
          step="0.01"
          className="border p-2 rounded w-full"
        />
        {state.errors?.amount && (
          <p className="text-red-500">{state.errors.amount.join(", ")}</p>
        )}
      </label>

      {/* Status */}
      <label className="flex flex-col gap-1">
        Status
        <select name="status" className="border p-2 rounded w-full">
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
        </select>
        {state.errors?.status && (
          <p className="text-red-500">{state.errors.status.join(", ")}</p>
        )}
      </label>

      {/* Submit */}
      <Button type="submit">Create Invoice</Button>

      {/* General message */}
      {state.message && <p className="text-red-500">{state.message}</p>}
    </form>
  );
}
