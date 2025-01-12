"use client";

import React from "react";
import { useQuery } from "@apollo/client";
import { SKILLS } from "@/graphql/queries";
import SkillsBarChart from "./graphs/SkillsBarChart";

const SkillsInfo = () => {
  const { data, loading, error } = useQuery(SKILLS);
  const skillSummary: { [key: string]: number } = {};

  if (data?.transaction) {
    data.transaction.forEach((transaction: { type: any; amount: any }) => {
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
