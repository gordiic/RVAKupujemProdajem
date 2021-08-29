using RVAProjekat.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RVAProjekat.AppData.Interfaces
{
	public interface IItemProvider
	{
		public void AddItem(Item item);
		public List<Item> RetrieveAllItems();
		public Item FindItemById(int id);
		public List<Item> FindItemsByUserId(int id);
		public Item FindItemByName(string name);
		public void UpdateItem(Item item);
		public bool DeleteItem(int id);
		public void RemoveAllItemsFromTable();
		public void DeleteUserItems(int id);

	}
}
