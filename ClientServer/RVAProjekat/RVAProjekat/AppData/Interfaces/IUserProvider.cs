using RVAProjekat.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RVAProjekat.AppData.Interfaces
{
	public interface IUserProvider
	{
		public void AddUser(User user);
		public List<User> RetrieveAllUsers();
		public User FindUserByUsername(string username);
		public User FindUserById(int? id);
		public void UpdateUser(User user);
		public void RemoveAllUsersFromTable();
		public void DeleteUser(int id);

	}
}
