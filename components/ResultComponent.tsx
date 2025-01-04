"use client";

import React from "react";
import { useQuery } from "@apollo/client";
import { GET_RESULT } from "@/graphql/queries";

const ResultComponent = () => {
  const { data, loading, error } = useQuery(GET_RESULT);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Results</h1>
      {data.result.map((res: any) => (
        <div key={res.id}>
          <p>ID: {res.id}</p>
          <p>User ID: {res.user.id}</p>
          <p>Login: {res.user.login}</p>
        </div>
      ))}
    </div>
  );
};

export default ResultComponent;
