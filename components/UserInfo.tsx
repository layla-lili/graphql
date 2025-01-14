"use client";

import React from "react";
import { useQuery } from "@apollo/client";
import { USER_INFO } from "@/graphql/queries";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"; // Assuming you have a card component
import { User, Mail, MapPin, CheckCircle, Star, Award, Key } from "lucide-react"; // Import icons from lucide-react
import { decodeJwt } from "@/app/ApolloWrapper";

const UserInfo = () => {
  const token = localStorage.getItem("JWT");
  const decodedToken = decodeJwt(token);
  const userId = decodedToken["sub"] || 0;
  const rootEventId = 20; // Replace with the actual root event ID you want to use

  // Use useQuery with variables
  const { data, loading, error } = useQuery(USER_INFO, {
    variables: { userId, rootEventId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Accessing the data from the query response
  const xpAmount = data.xp.aggregate.sum.amount;
  const levelAmount = data.level[0]?.amount; // Optional chaining to avoid errors if level is empty
  const userInfo = data.user;

  return (
    <div className="grid grid-cols-1 gap-4 p-4 w-full">
      {userInfo.map((user: any) => (
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
              <Key className="mr-2" /> {/* Using a key icon for ID */}
                <span>ID: {user.id}</span>
              </div>
              <div className="flex items-center mb-2">
                <Star className="mr-2" /> {/* Using a star icon for Level */}
                <span>Level: {levelAmount}</span>
              </div>
              <div className="flex items-center mb-2">
                <Award className="mr-2" /> {/* Using an award icon for XP */}
                <span>XP: {xpAmount}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UserInfo;