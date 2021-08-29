using RVAProjekat.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RVAProjekat.AppData.Interfaces
{
	public interface INotificationProvider
	{
		public void AddObavjestenje(Obavjestenje obavjestenje);
		public List<Obavjestenje> RetrieveAllObavjestenja();
		public List<Obavjestenje> FindObavjestenjaByUserId(int id);
		public Obavjestenje FindObavjestenjeById(int id);
		public bool DeleteObavjestenje(int id);
		public void RemoveAllNorificationsFromTable();
		public void DeleteUserNotifications(int id);

	}
}
