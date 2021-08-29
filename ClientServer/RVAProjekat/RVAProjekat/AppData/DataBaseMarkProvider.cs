using RVAProjekat.AppData.Interfaces;
using RVAProjekat.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RVAProjekat.AppData
{
	public class DataBaseMarkProvider : IMarkProvider
	{

		public void AddOcjena(Ocjena ocjena)
		{
			using (var db = new DataBaseContext())
			{
				db.Ocjenas.Add(ocjena);
				db.SaveChanges();
			}
		}
		public List<Ocjena> RetrieveAllMarks()
		{
			List<Ocjena> marks = null;
			using (var db = new DataBaseContext())
			{
				var query = from u in db.Ocjenas
							select u;
				marks = query.ToList();
			}
			if (marks == null)
				marks = new List<Ocjena>();

			return marks;
		}
		public List<Ocjena> FindOcjeneByUserId(int id)
		{
			List<Ocjena> ocjene = null;
			using (var db = new DataBaseContext())
			{
				var result = from i in db.Ocjenas
							 where i.IdKorisnikaOcijenjenog == id
							 select i;
				if (result.ToList<Ocjena>().Count > 0)
					ocjene = result.ToList<Ocjena>();
			}
			return ocjene;
		}

		public void RemoveAllOcjeneFromTable()
		{
			List<Ocjena> marks = RetrieveAllMarks();
			using (var db = new DataBaseContext())
			{
				foreach (Ocjena o in marks)
				{
					db.Ocjenas.Remove(o);
				}
				db.SaveChanges();
			}
		}

		public void DeleteUserMarks(int id)
		{
			List<Ocjena> ocjene = null;
			using (var db = new DataBaseContext())
			{
				var result = from i in db.Ocjenas
							 where i.IdKorisnika == id
							 select i;
				if (result.ToList<Ocjena>().Count > 0)
					ocjene = result.ToList<Ocjena>();

				if (ocjene == null)
				{
					ocjene = new List<Ocjena>();
				}

				foreach(Ocjena o in ocjene)
				{
					db.Ocjenas.Remove(o);
				}

				db.SaveChanges();
			}
		}
	}
}
