using RVAProjekat.AppData.Interfaces;
using RVAProjekat.AppData.Strategy;
using RVAProjekat.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RVAProjekat.AppData
{
	public class DataBaseItemProvider : IItemProvider
	{

		public void AddItem(Item item)
		{
			using (var db = new DataBaseContext())
			{
				db.Items.Add(item);
				db.SaveChanges();
			}
		}
		public List<Item> RetrieveAllItems()
		{
			List<Item> items=null;
			using (var db = new DataBaseContext())
			{
				var result = db.Items.ToList();
				items = result;
			}
			if (items == null)
				items = new List<Item>();
			return items;
		}
		public Item FindItemById(int id)
		{
			Item item = null;
			using (var db = new DataBaseContext())
			{
				item = db.Items.Find(id);
			}
			if (item == null)
				item = new Item();
			return item;
		}
		public List<Item> FindItemsByUserId(int id)
		{
			IUserProvider userProvider = UserProviderStrategy.GetStrategy();

			List<Item> items = userProvider.FindUserById(id).Items.ToList();
			if (items == null)
				items = new List<Item>();
			return items;
		}

		public Item FindItemByName(string name)
		{
			List<Item> items = null;
			using (var db = new DataBaseContext())
			{
				var result = db.Items.Where(a => a.Naslov== name).ToList();
				items = result;
			}
			if (items == null)
			{
				return new Item();
			}
			else
			{
				foreach (Item i in items)
					return i;
			}

			return new Item();

		}
		public void UpdateItem(Item item)
		{
			using (var db = new DataBaseContext())
			{
				db.Items.Update(item);
				db.SaveChanges();
			}
		}
		public bool DeleteItem(int id)
		{
			using (var db = new DataBaseContext())
			{
				Item item = FindItemById(id);
				if (item != null)
					db.Items.Remove(item);
				else
					return false;
				db.SaveChanges();
				return true;
			}
		}

		public void RemoveAllItemsFromTable()
		{
			using (var db = new DataBaseContext())
			{
				db.Items.RemoveRange(db.Items);
				db.SaveChanges();
			}
		}

		public void DeleteUserItems(int id)
		{
			List<Item> items = FindItemsByUserId(id);

			using (var db = new DataBaseContext())
			{
				foreach (Item i in items)
				{
					db.Items.Remove(i);
				}
				db.SaveChanges();
			}
		}
	}
}
