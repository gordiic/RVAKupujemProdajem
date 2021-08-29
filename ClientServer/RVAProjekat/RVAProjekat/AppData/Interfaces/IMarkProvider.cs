using RVAProjekat.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RVAProjekat.AppData.Interfaces
{
	public interface IMarkProvider
	{
		public void AddOcjena(Ocjena ocjena);
		public List<Ocjena> RetrieveAllMarks();
		public List<Ocjena> FindOcjeneByUserId(int id);
		public void RemoveAllOcjeneFromTable();
		public void DeleteUserMarks(int id);

	}
}
