using RVAProjekat.AppData.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RVAProjekat.AppData.Strategy
{
	public class MarkProviderStrategy
	{
		private static IMarkProvider markProvider;

		public static void SetStrategy(IMarkProvider mP)
		{
			markProvider = mP;
		}

		public static IMarkProvider GetStrategy()
		{
			return markProvider;
		}
	}
}
