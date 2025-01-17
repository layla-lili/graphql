"use client";

import React from "react";
import { useQuery } from "@apollo/client";
import { SKILLS } from "@/graphql/queries";
import SkillsBarChart from "./graphs/SkillsBarChart";

// Define types for the transaction and the query result
interface TransactionType {
  type: string; // Define as string or a specific enum if applicable
  amount: number; // Assuming amount is a number
}

interface SkillsData {
  transaction: TransactionType[]; // Define the structure of the data
}

const SkillsInfo = () => {
  const { data, loading, error } = useQuery<SkillsData>(SKILLS); // Use the defined type

  const skillSummary: { [key: string]: number } = {};

  if (data?.transaction) {
    data.transaction.forEach((transaction) => {
      const skillType = transaction.type;
      const amount = transaction.amount;

      if (skillSummary[skillType]) {
        skillSummary[skillType] += amount;
      } else {
        skillSummary[skillType] = amount;
      }
    });
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Your Skills</h2>
      <SkillsBarChart />
    </div>
  );
};

export default SkillsInfo;