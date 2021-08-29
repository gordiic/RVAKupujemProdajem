using RVAProjekat.AppData.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RVAProjekat.AppData.Strategy
{
	public class UserProviderStrategy
	{
		private static IUserProvider userProvider;

		
		public static void SetStrategy(IUserProvider uP)
		{
			userProvider = uP;
		}

		public static IUserProvider GetStrategy()
		{
			return userProvider;
		}
	}
}
