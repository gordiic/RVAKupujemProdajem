using RVAProjekat.AppData.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RVAProjekat.AppData.Strategy
{
	public class NotificationProviderStrategy
	{
		private static INotificationProvider notificationProvider;

		public static void SetStrategy(INotificationProvider mP)
		{
			notificationProvider = mP;
		}

		public static INotificationProvider GetStrategy()
		{
			return notificationProvider;
		}
	}
}
