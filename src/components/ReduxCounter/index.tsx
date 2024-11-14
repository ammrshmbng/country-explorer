"use client";

import { useSelector, useDispatch } from "react-redux";
import {
  increment,
  decrement,
  reset,
  incrementByAmount,
} from "@/lib/features/counterSlice";
import {useState } from "react";
import { RootState } from "@/types/types";

const index = () => {
  const count = useSelector((state: RootState) => state.counter.count);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState<number | string>(0);
  const addValue = Number(incrementAmount) || 0;
  const resetAll = () => {
    setIncrementAmount(0);
    dispatch(reset());
  };
    return (
      <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <p className="text-4xl font-bold mb-6">{count}</p>
      <div className="flex gap-4 mb-6">
        <button 
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => dispatch(increment())}>+</button>
        <button 
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => dispatch(decrement())}>-</button>
      </div>

      <input
        type="text"
        value={incrementAmount}
        onChange={(e) => setIncrementAmount(e.target.value)}
        className="border-2 border-gray-300 rounded-md px-4 py-2 mb-6 w-32 text-center"
      />

      <div className="flex gap-4">
        <button 
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => dispatch(incrementByAmount(addValue))}>
          Add Amount
        </button>
        <button 
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
          onClick={resetAll}>Reset</button>
      </div>
    </section>
      );
}

export default index