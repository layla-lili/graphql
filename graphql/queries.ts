import { gql } from "@apollo/client";

export const USER_INFO = gql`
 query rootEventDetails($userId: Int!, $rootEventId: Int!) {
    xp: transaction_aggregate(
      where: {
        userId: { _eq: $userId }
        type: { _eq: "xp" }
        eventId: { _eq: $rootEventId }
      }
    ) { aggregate { sum { amount } } }
    level: transaction(
      limit: 1
      order_by: { amount: desc }
      where: {
        userId: { _eq: $userId }
        type: { _eq: "level" }
        eventId: { _eq: $rootEventId }
      }
    ) { amount }
       user {
      id
      login
      auditRatio
      campus
      firstName
      lastName
      email
    }
  }
`;

export const SKILLS = gql`
  query {
    transaction(where: { type: { _regex: "skill" } }) {
      path
      amount
      type
      objectId
    }
  }
`;

export const ALL_USERS_LEVEL = gql`
 query  {
       event_user(where: { eventId: { _in: [72, 20, 250] } }) {
      level
      userId
      userLogin
      eventId
  }

  }
`;

export const XP_LEVEL = gql`
query rootEventDetails($userId: Int!, $rootEventId: Int!) {
    xp: transaction_aggregate(
      where: {
        userId: { _eq: $userId }
        type: { _eq: "xp" }
        eventId: { _eq: $rootEventId }
      }
    ) { aggregate { sum { amount } } }
    level: transaction(
      limit: 1
      order_by: { amount: desc }
      where: {
        userId: { _eq: $userId }
        type: { _eq: "level" }
        eventId: { _eq: $rootEventId }
      }
    ) { amount }
       user {
      id
      login
      auditRatio
      campus
      firstName
      lastName
      email
    }
  }
`;

// xp progress over time
export const PROGRESS = gql`
 query Transaction {
    transaction(
      where: {
        type: { _eq: "xp" }
        event: { path: { _eq: "/bahrain/bh-module" } }
      }
    ) {
      amount
      path
      createdAt
      object {
        name
        object_type {
          type
        }
      }
    }
  }

`;

//$userId  => login user id
// $selectedEventId => event id
// $rootEventId grand parent event id  eventId: { _in: [72, 20, 250] }
//TODO
const USER_PROGRESS = gql`
query progress($userId: Int!, $selectedEventId: Int!, $rootEventId: Int!) {
    progress (
      order_by: [{ path: asc} , {createdAt: asc}, {grade: asc }]
      where: {
        userId: { _eq: $userId }
        _or: [
          { eventId: { _eq: $selectedEventId} },
          { event: { parentId: { _eq: $selectedEventId } } },
          {
            event: {
              object: { type: { _eq: "module" } }
              children: { id: { _eq: $selectedEventId } }
            }
          },
          {
            _and: [
              { object: { type: { _eq: "piscine" } } }
              {
                event: {
                  parent: { object: { type: { _eq: "module" } } }
                  parentId: { _eq: $rootEventId }
                }
              }
            ]
          }
        ]
      }
    ) {
      id
      path
      grade
      isDone
      eventId
      version
      createdAt
      updatedAt
    }
  }`;

export const USER_PASSFAILCOUNT = gql`
query GetAuditCounts($auditorId: Int!) {
  passCount: audit_aggregate(
    where: {
      group: { campus: { _eq: "bahrain" } },
      auditorId: { _eq: $auditorId },
      private: { code: { _is_null: false } },
      grade: { _gte: 1 }  
    }
  ) {
    aggregate {
      count
    }
  }

  failCount: audit_aggregate(
    where: {
      group: { campus: { _eq: "bahrain" } },
      auditorId: { _eq: $auditorId },
      private: { code: { _is_null: false } },
      grade: { _lt: 1 }  
    }
  ) {
    aggregate {
      count
    }
  }

  audits: audit(
    where: {
      group: { campus: { _eq: "bahrain" } },
      auditorId: { _eq: $auditorId },
      private: { code: { _is_null: false } }
    }
    order_by: { endAt: asc_nulls_last, createdAt: asc }
  ) {
    id
    group {
      id
      path
      captainLogin
      captain {
        canAccessPlatform
      }
    }
    private {
      code
    }
    createdAt
    endAt
    version
    grade
  }
}
`;





 //---------Explore Query-----------------//
  export const SCHEMA_TABLE = gql`
 query {
        
  __schema {
    queryType {
      fields {
        name
      }
    }
  }
    
 
  }

  `;

  export const TableFields = gql`
  query {
  __type(name: "progress") {
    name
    fields {
      name
      type {
        name
        kind
        ofType {
          name
          kind
        }
      }
    }
  }
}

`;

// example social-network with setp status
export const USERS_PROJECT_STATUS = gql`
query {
  group_user(
  where: { 
    group: { 
       path: { _like: "%social-network" }, 
          status: { _eq: setup }
    } 
  }) {
   
    group {
      eventId
     
      path
      status
    }
    user {
      
      login
      firstName
      lastName
      campus

    }
  }
}

`;

export const SCHEMA = gql`      

 query {
      
     __schema {
    types {
      name
      kind
      fields {
        name
        type {
          name
          kind
        }
      }
    }
  }
}
`;
