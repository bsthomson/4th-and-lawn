Jayhawk.insertMany([
  {
    address: "1101 Mississippi St, Lawrence, KS 66044",
    event: "KU Hosting Nicholls 6 P.M. Kickoff",
    date: "09/01/2018"
  },
  {
    address: "1101 Mississippi St, Lawrence, KS 66044",
    event: "KU Hosting Rutgers 11 A.M. Kickoff",
    date: "09/15/2018"
  },
  {
    address: "1101 Mississippi St, Lawrence, KS 66044",
    event: "KU Hosting OSU 11 A.M. Kickoff",
    date: "09/29/2018"
  },
  {
    address: "1101 Mississippi St, Lawrence, KS 66044",
    event: "KU Hosting TCU TBA Kickoff",
    date: "10/27/2018"
  },
  {
    address: "1101 Mississippi St, Lawrence, KS 66044",
    event: "KU Hosting ISU TBA Kickoff",
    date: "11/03/2018"
  },
  {
    address: "1101 Mississippi St, Lawrence, KS 66044",
    event: "KU Hosting TU 11 A.M. Kickoff",
    date: "11/23/2018"
  }
])

mongoose.connection.db.dropDatabase();