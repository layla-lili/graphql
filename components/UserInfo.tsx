"use client";

import React from "react";
import { useQuery } from "@apollo/client";
import { USER_INFO } from "@/graphql/queries";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { User, Mail, MapPin, CheckCircle, Star, Award, Key } from "lucide-react";

// Define types for the query response
interface TransactionAggregate {
  aggregate: {
    sum: {
      amount: number; // Amount for XP
    };
  };
}

interface LevelType {
  amount: number; // Level amount
}

interface UserType {
  id: string; // Assuming ID is a string
  login: string;
  auditRatio: number;
  campus: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface UserInfoData {
  xp: TransactionAggregate; // XP aggregate response
  level: LevelType[]; // Level response array
  user: UserType[]; // User details
}

const UserInfo: React.FC<{ userId: string }> = ({ userId }) => {
  // const token = Cookies.get('JWT');
  // const decodedToken = token ? decodeJwt(token) : null;

  // const userId = decodedToken ? decodedToken["sub"] : null;
  const rootEventId = 20;

  const { data, loading, error } = useQuery<UserInfoData>(USER_INFO, {
    variables: { userId, rootEventId },
    skip: !userId, // Skip query if userId is not available
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (!data || !data.user.length) {
    return <p>No data available.</p>; // Gracefully handle empty data
  }

  const xpAmount = data.xp.aggregate.sum.amount;
  const levelAmount = data.level[0]?.amount;

  return (
    <div className="grid grid-cols-1 gap-4 p-4 w-full">
      {data.user.map((user) => (
        <Card key={user.id} className="flex flex-col md:flex-row p-4 shadow-lg rounded-lg">
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
                <Key className="mr-2" />
                <span>ID: {user.id}</span>
              </div>
              <div className="flex items-center mb-2">
                <Star className="mr-2" />
                <span>Level: {levelAmount}</span>
              </div>
              <div className="flex items-center mb-2">
                <Award className="mr-2" />
                <span>XP: {xpAmount} Bytes</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UserInfo;

