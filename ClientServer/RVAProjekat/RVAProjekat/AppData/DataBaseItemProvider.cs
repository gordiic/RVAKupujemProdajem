using RVAProjekat.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RVAProjekat.AppData
{
	public class DataBaseItemProvider
	{

		public static void AddItem(Item item)
		{
			using (var db = new DataBaseContext())
			{
				db.Items.Add(item);
				db.SaveChanges();
			}
		}
		public static List<Item> RetrieveAllItems()
		{
			List<Item> items=null;
			using (var db = new DataBaseContext())
			{
				var query = from c in db.Items
							select c;
				items = query.ToList();
			}
			if (items == null)
				items = new List<Item>();
			return items;
		}
		public static Item FindItemById(int id)
		{
			Item item = null;
			using (var db = new DataBaseContext())
			{
				item = db.Items.Find(id);
			}
			return item;
		}
		public static List<Item> FindItemsByUserId(int id)
		{
			List<Item> items = null;
			using (var db = new DataBaseContext())
			{
				var result = from i in db.Items
							 where i.UserId == id
							 select i;
				if (result.ToList<Item>().Count > 0)
					items = result.ToList<Item>();
			}
			if (items == null)
				items = new List<Item>();
			return items;
		}

		public static Item FindItemByName(string name)
		{
			List<Item> items = null;
			using (var db = new DataBaseContext())
			{
				var result = from i in db.Items
							 where i.Naslov == name
							 select i;
				if (result.ToList<Item>().Count > 0)
					items = result.ToList<Item>();
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
		public static void UpdateItem(Item item)
		{
			using (var db = new DataBaseContext())
			{
				db.Items.Update(item);
				db.SaveChanges();
			}
		}
		public static bool DeleteItem(int id)
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

		public static void RemoveAllItemsFromTable()
		{
			List<Item> items = RetrieveAllItems();
			using (var db = new DataBaseContext())
			{
				foreach (Item i in items)
				{
					db.Items.Remove(i);
				}
				db.SaveChanges();
			}
		}

		public static void DeleteUserItems(int id)
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
