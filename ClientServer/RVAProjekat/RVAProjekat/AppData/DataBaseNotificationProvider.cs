using RVAProjekat.AppData.Interfaces;
using RVAProjekat.AppData.Strategy;
using RVAProjekat.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RVAProjekat.AppData
{
	public class DataBaseNotificationProvider : INotificationProvider
	{
		public void AddObavjestenje(Obavjestenje obavjestenje)
		{
			using (var db = new DataBaseContext())
			{
				db.Obavjestenja.Add(obavjestenje);
				db.SaveChanges();
			}
		}

		public List<Obavjestenje> RetrieveAllObavjestenja()
		{
			List<Obavjestenje> obavjestenja;
			using (var db = new DataBaseContext())
			{
				var result = db.Obavjestenja.ToList();
				obavjestenja = result;
			}
			return obavjestenja;
		}
		public List<Obavjestenje> FindObavjestenjaByUserId(int id)
		{
			IUserProvider userProvider = UserProviderStrategy.GetStrategy();

			List<Obavjestenje> obavjestenja= userProvider.FindUserById(id).Obavjestenja.ToList();
			if (obavjestenja == null)
				obavjestenja = new List<Obavjestenje>();
			return obavjestenja;
		}
		public Obavjestenje FindObavjestenjeById(int id)
		{
			Obavjestenje obavjestenje = null;
			using (var db = new DataBaseContext())
			{
				obavjestenje = db.Obavjestenja.Find(id);
			}
			if (obavjestenje == null)
				obavjestenje = new Obavjestenje();
			return obavjestenje;
		}
		public bool DeleteObavjestenje(int id)
		{
			using (var db = new DataBaseContext())
			{
				Obavjestenje obavjestenje = FindObavjestenjeById(id);
				if (obavjestenje != null)
					db.Obavjestenja.Remove(obavjestenje);
				else
					return false;
				db.SaveChanges();
				return true;
			}
		}

		public void RemoveAllNotificationsFromTable()
		{
			List<Obavjestenje> notifications = RetrieveAllObavjestenja();
			using (var db = new DataBaseContext())
			{
				db.Obavjestenja.RemoveRange(db.Obavjestenja);
				db.SaveChanges();
			}
		}
		public void DeleteUserNotifications(int id)
		{
			List<Obavjestenje> notifications = FindObavjestenjaByUserId(id);
			List<Obavjestenje> notifications2 = null;
			using (var db = new DataBaseContext())
			{
				var result = db.Obavjestenja.Where(a => a.OdkogaId == id).ToList();
				notifications2 = result;
				if (notifications== null)
					notifications = new List<Obavjestenje>();
				if (notifications2 == null)
					notifications2 = new List<Obavjestenje>();

				foreach(Obavjestenje o in notifications)
				{
					db.Obavjestenja.Remove(o);
				}

				foreach(Obavjestenje o in notifications2)
				{
					db.Obavjestenja.Remove(o);
				}
				db.SaveChanges();
			}
		}
	}
}
