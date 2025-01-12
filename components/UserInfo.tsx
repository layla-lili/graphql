"use client";

import React from "react";
import { useQuery } from "@apollo/client";
import { USER_INFO } from "@/graphql/queries";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"; // Assuming you have a card component
import { User, Mail, MapPin, CheckCircle } from "lucide-react"; // Import icons from lucide-react

const UserInfo = () => {
  const { data, loading, error } = useQuery(USER_INFO);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="grid grid-cols-1 gap-4 p-4 w-full">
      {data.user.map((user: any) => (
        <Card 
          key={user.id} 
          className="flex flex-col md:flex-row p-4 shadow-lg rounded-lg"
        >
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center">
              <User className="mr-2" /> {user.firstName} {user.lastName}
            </CardTitle>
            <CardDescription>{user.login}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col">
              <div className="flex items-center mb-2">
                <CheckCircle className="mr-2" />
                <span>Audit Ratio: {user.auditRatio.toFixed(1)}%</span>
              </div>
              <div className="flex items-center mb-2">
                <MapPin className="mr-2" />
                <span>Campus: {user.campus}</span>
              </div>
              <div className="flex items-center mb-2">
                <Mail className="mr-2" />
                <span>Email: {user.email}</span>
              </div>
              <div className="flex items-center mb-2">
                <span>ID: {user.id}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UserInfo;
