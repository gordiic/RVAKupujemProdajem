using RVAProjekat.AppData.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RVAProjekat.AppData.Strategy
{
	public class ItemProviderStrategy
	{
		private static IItemProvider itemProvider;

		public static void SetStrategy(IItemProvider iP)
		{
			itemProvider = iP;
		}

		public static IItemProvider GetStrategy()
		{
			return itemProvider;
		}
	}
}
