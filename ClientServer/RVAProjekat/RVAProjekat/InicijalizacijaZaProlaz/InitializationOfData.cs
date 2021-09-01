using RVAProjekat.AppData;
using RVAProjekat.AppData.Interfaces;
using RVAProjekat.AppData.Strategy;
using RVAProjekat.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RVAProjekat.InicijalizacijaZaProlaz
{
	public class InitializationOfData
	{
		private IUserProvider userProvider = UserProviderStrategy.GetStrategy();
		private IItemProvider itemProvider = ItemProviderStrategy.GetStrategy();
		private IMarkProvider markProvider = MarkProviderStrategy.GetStrategy();
		private INotificationProvider notificationProvider = NotificationProviderStrategy.GetStrategy();
		public void Initialize()
		{
			itemProvider.RemoveAllItemsFromTable();
			markProvider.RemoveAllOcjeneFromTable();
			notificationProvider.RemoveAllNotificationsFromTable();
			userProvider.RemoveAllUsersFromTable();
			;
			if (userProvider.RetrieveAllUsers().Count == 0)
			{
				userProvider.AddUser(new User("Nebojsa","Gordic","admin","admin","admin@gmail.com","admin"));
				userProvider.AddUser(new User("Petar", "Petrovic", "petar", "petar", "petar@gmail.com", "user"));
				userProvider.AddUser(new User("Marko", "Markovic", "marko", "marko", "marko@gmail.com", "user"));

			}

			if (itemProvider.RetrieveAllItems().Count == 0)
			{
				itemProvider.AddItem(new Item(userProvider.FindUserByUsername("admin").Id, "admin", "Golf 2", "Automobili", "nudim", "1200", true, false, "1990. godiste, kao nov, 4 vrata, siva boja", "Ljubinje", "066260748"));
				itemProvider.AddItem(new Item(userProvider.FindUserByUsername("admin").Id, "admin", "Xiaomi note 9",  "Nakit i satovi", "nudim", "230", true, true, "Sat je nov, nikad koriscen, pod garanciom", "Sokolac", "066260748"));

				itemProvider.AddItem(new Item(userProvider.FindUserByUsername("petar").Id, "Petar", "Fap 13", "Kamioni", "nudim", "3000", false, false, "1979. godiste, cisterna, ne rade kocnice, narandzast", "Trebinje", "066878821"));
				itemProvider.AddItem(new Item(userProvider.FindUserByUsername("petar").Id, "Petar", "Stap za pecanje",  "Lov i ribolov", "nudim", "100", true, true, "Polovan stap uz musice i mamce.", "Trebinje", "066878821"));

				itemProvider.AddItem(new Item(userProvider.FindUserByUsername("marko").Id, "Marko", "Masina za ves Gorenje", "Bijela tehnika", "nudim", "300", true, false, "Nova masina za ves. 800 obrtaja", "Srpsko Sarajevo", "065252515"));
				itemProvider.AddItem(new Item(userProvider.FindUserByUsername("marko").Id, "Marko", "Arduino", "Elektronika", "nudim", "420", false, true, "Arduino plocica", "Srpsko Sarajevo", "065252515"));
			}

			if (markProvider.RetrieveAllMarks().Count == 0)
			{
				User user = userProvider.FindUserById(userProvider.FindUserByUsername("admin").Id);
				double suma = user.ProsjecnaOcjena * user.BrOcjena;
				suma +=7;
				user.BrOcjena= user.BrOcjena+2;
				user.ProsjecnaOcjena = suma / user.BrOcjena;
				userProvider.UpdateUser(user);

				markProvider.AddOcjena(new Ocjena("Prodavac je okej", 3, "petar", userProvider.FindUserByUsername("petar").Id, userProvider.FindUserByUsername("admin").Id));
				markProvider.AddOcjena(new Ocjena("Prodavac je odlican, sve super", 4, "marko", userProvider.FindUserByUsername("marko").Id, userProvider.FindUserByUsername("admin").Id));

				User user2 = userProvider.FindUserById(userProvider.FindUserByUsername("petar").Id);
				double suma2 = user2.ProsjecnaOcjena * user2.BrOcjena;
				suma2 += 5;
				user2.BrOcjena = user2.BrOcjena + 2;
				user2.ProsjecnaOcjena = suma2 / user2.BrOcjena;
				userProvider.UpdateUser(user2);

				markProvider.AddOcjena(new Ocjena("Nisam zadovoljan", 1, "admin", userProvider.FindUserByUsername("admin").Id, userProvider.FindUserByUsername("petar").Id));
				markProvider.AddOcjena(new Ocjena("Vrlo dobra prodaja", 4, "marko", userProvider.FindUserByUsername("marko").Id, userProvider.FindUserByUsername("petar").Id));

			}
			if (notificationProvider.RetrieveAllObavjestenja().Count == 0)
			{
				notificationProvider.AddObavjestenje(new Obavjestenje(0, userProvider.FindUserByUsername("petar").Id, "petar", userProvider.FindUserByUsername("admin").Id, "admin", "zeli da kupi artikal", itemProvider.FindItemByName("Xiaomi note 9").Id));
				notificationProvider.AddObavjestenje(new Obavjestenje(0, userProvider.FindUserByUsername("marko").Id, "marko", userProvider.FindUserByUsername("admin").Id, "admin", "zeli da kupi artikal", itemProvider.FindItemByName("Xiaomi note 9").Id));

				notificationProvider.AddObavjestenje(new Obavjestenje(0, userProvider.FindUserByUsername("marko").Id, "marko", userProvider.FindUserByUsername("petar").Id, "petar", "zeli da kupi artikal", itemProvider.FindItemByName("Fap 13").Id));
				notificationProvider.AddObavjestenje(new Obavjestenje(0, userProvider.FindUserByUsername("marko").Id, "marko", userProvider.FindUserByUsername("petar").Id, "petar", "zeli da kupi artikal", itemProvider.FindItemByName("Stap za pecanje").Id));
			}
		}
	}
}
