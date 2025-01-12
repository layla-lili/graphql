import { gql } from "@apollo/client";

export const USER_INFO = gql`
  query User {
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



export const PASSFAILCOUNT = gql`
query {
  pass: result_aggregate(where: { grade: { _gte: 1 } }) {
    aggregate {
      count
    }
   
  }
  fail: result_aggregate(where: { grade: { _lt: 1 } }) {
    aggregate {
      count
    }
    
  }
}

`;

// TODO: change it to the correct query
export const XP = gql`
  query {
    transaction(where: { type: { _regex: "xp" } }) {
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

// TODO: change it to the correct query
export const ALL_USER_AUDIT = gql`
  query  {
        event_user(where: { eventId: { _in: [72, 20, 250] } }) {
        auditRatio
        userId
        userLogin
        eventId
    }
  
    }
 
  `;




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
