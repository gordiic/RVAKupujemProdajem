using RVAProjekat.AppData.Interfaces;
using RVAProjekat.AppData.Strategy;
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
				var result = db.Ocjenas.ToList();
				marks = result;
			}
			if (marks == null)
				marks = new List<Ocjena>();

			return marks;
		}
		public List<Ocjena> FindOcjeneByUserId(int id)
		{
			IUserProvider userProvider = UserProviderStrategy.GetStrategy();

			List<Ocjena> marks= userProvider.FindUserById(id).Ocjene.ToList();
			if (marks == null)
				marks = new List<Ocjena>();
			return marks;
		}

		public void RemoveAllOcjeneFromTable()
		{
			using (var db = new DataBaseContext())
			{
				db.Ocjenas.RemoveRange(db.Ocjenas);
				db.SaveChanges();
			}
		}

		public void DeleteUserMarks(int id)
		{
			List<Ocjena> ocjene = FindOcjeneByUserId(id);
			using (var db = new DataBaseContext())
			{
				foreach(Ocjena o in ocjene)
				{
					db.Ocjenas.Remove(o);
				}
				db.SaveChanges();
			}
		}
	}
}
