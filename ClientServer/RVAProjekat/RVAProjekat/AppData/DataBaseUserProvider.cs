using RVAProjekat.AppData.Interfaces;
using RVAProjekat.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RVAProjekat.AppData
{
	public class DataBaseUserProvider : IUserProvider
	{
		public void AddUser(User user)
		{
			using (var db = new DataBaseContext())
			{
				db.Users.Add(user);
				db.SaveChanges();
			}
		}
		public List<User> RetrieveAllUsers()
		{
			List<User> users=null;
			using (var db = new DataBaseContext())
			{
				var query = from u in db.Users
							select u;
				users = query.ToList();
			}
			if (users == null)
				users = new List<User>();

			return users;
		}
		public User FindUserByUsername(string username)
		{
			User user = null;
			using (var db = new DataBaseContext())
			{
				var result = from u in db.Users
							 where u.KorisnickoIme == username
							 select u;
				if (result.ToList<User>().Count > 0)
					foreach (User u in result.ToList<User>())
						user = u;
			}
			return user;
		}
		public User FindUserById(int id)
		{
			User user = null;
			using (var db = new DataBaseContext())
			{
				var result = from u in db.Users
							 where u.Id == id
							 select u;
				if (result.ToList<User>().Count > 0)
					foreach (User u in result.ToList<User>())
						user = u;
			}
			return user;
		}
		public void UpdateUser(User user)
		{
			using (var db = new DataBaseContext())
			{
				db.Users.Update(user);
				db.SaveChanges();
			}
		}

		public void RemoveAllUsersFromTable()
		{
			List<User> users = RetrieveAllUsers();
			using (var db = new DataBaseContext())
			{
				foreach (User u in users)
				{
					db.Users.Remove(u);
				}
				db.SaveChanges();
			}
		}

		public  void DeleteUser(int id)
		{
			User u = FindUserById(id);
			using (var db = new DataBaseContext())
			{
				db.Users.Remove(u);
				db.SaveChanges();
			}
		}
	}
}
