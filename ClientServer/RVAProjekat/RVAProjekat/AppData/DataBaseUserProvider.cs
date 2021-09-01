using Microsoft.EntityFrameworkCore;
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
				var result = db.Users.Include(a => a.Items).Include(a => a.Obavjestenja).Include(a => a.Ocjene).ToList();
				users = result;
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
				var result = db.Users.Where(a => a.KorisnickoIme == username).Include(a => a.Items).Include(a=>a.Obavjestenja).Include(a=>a.Ocjene).ToList();
				user = result[0];
			}
			return user;
		}
		public User FindUserById(int? id)
		{
			User user = null;
			using (var db = new DataBaseContext())
			{
				var result = db.Users.Where(a => a.Id == id).Include(a => a.Items).Include(a => a.Obavjestenja).Include(a => a.Ocjene).ToList();
				user = result[0];
			}
			if (user == null)
				user = new User();
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
