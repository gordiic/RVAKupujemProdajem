using RVAProjekat.AppData.Interfaces;
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
				var query = from c in db.Obavjestenja
							select c;
				obavjestenja = query.ToList();
			}
			return obavjestenja;
		}
		public List<Obavjestenje> FindObavjestenjaByUserId(int id)
		{
			List<Obavjestenje> obavjestenja = null;
			using (var db = new DataBaseContext())
			{
				var result = from i in db.Obavjestenja
							 where i.KomeId == id
							 select i;
				if (result.ToList<Obavjestenje>().Count > 0)
					obavjestenja = result.ToList<Obavjestenje>();
			}
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

		public void RemoveAllNorificationsFromTable()
		{
			List<Obavjestenje> notifications = RetrieveAllObavjestenja();
			using (var db = new DataBaseContext())
			{
				foreach (Obavjestenje o in notifications)
				{
					db.Obavjestenja.Remove(o);
				}
				db.SaveChanges();
			}

		}
		public void DeleteUserNotifications(int id)
		{
			List<Obavjestenje> notifications = FindObavjestenjaByUserId(id);
			List<Obavjestenje> notifications2 = null;
			using (var db = new DataBaseContext())
			{
				var result = from i in db.Obavjestenja
							 where i.OdkogaId == id
							 select i;
				if (result.ToList<Obavjestenje>().Count > 0)
					notifications2 = result.ToList<Obavjestenje>();
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
