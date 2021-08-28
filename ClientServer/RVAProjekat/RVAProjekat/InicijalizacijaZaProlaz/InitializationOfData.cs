using RVAProjekat.AppData;
using RVAProjekat.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RVAProjekat.InicijalizacijaZaProlaz
{
	public class InitializationOfData
	{
		public static void Initialize()
		{
			DataBaseUserProvider.RemoveAllUsersFromTable();
			DataBaseItemProvider.RemoveAllItemsFromTable();
			DataBaseMarkProvider.RemoveAllOcjeneFromTable();
			DataBaseNotificationProvider.RemoveAllNorificationsFromTable();

			if (DataBaseUserProvider.RetrieveAllUsers().Count == 0)
			{
				DataBaseUserProvider.AddUser(new User("Nebojsa","Gordic","admin","admin","admin@gmail.com","admin"));
				DataBaseUserProvider.AddUser(new User("Petar", "Petrovic", "petar", "petar", "petar@gmail.com", "user"));
				DataBaseUserProvider.AddUser(new User("Marko", "Markovic", "marko", "marko", "marko@gmail.com", "user"));
			}

			if (DataBaseItemProvider.RetrieveAllItems().Count == 0)
			{
				DataBaseItemProvider.AddItem(new Item(DataBaseUserProvider.FindUserByUsername("admin").Id, "admin", "Golf 2", "Automobili", "nudim", "1200", true, false, "1990. godiste, kao nov, 4 vrata, siva boja", "Ljubinje", "066260748"));
				DataBaseItemProvider.AddItem(new Item(DataBaseUserProvider.FindUserByUsername("admin").Id, "admin", "Xiaomi note 9",  "Nakit i satovi", "nudim", "230", true, true, "Sat je nov, nikad koriscen, pod garanciom", "Sokolac", "066260748"));

				DataBaseItemProvider.AddItem(new Item(DataBaseUserProvider.FindUserByUsername("petar").Id, "Petar", "Fap 13", "Kamioni", "nudim", "3000", false, false, "1979. godiste, cisterna, ne rade kocnice, narandzast", "Trebinje", "066878821"));
				DataBaseItemProvider.AddItem(new Item(DataBaseUserProvider.FindUserByUsername("petar").Id, "Petar", "Stap za pecanje",  "Lov i ribolov", "nudim", "100", true, true, "Polovan stap uz musice i mamce.", "Trebinje", "066878821"));

				DataBaseItemProvider.AddItem(new Item(DataBaseUserProvider.FindUserByUsername("marko").Id, "Marko", "Masina za ves Gorenje", "Bijela tehnika", "nudim", "300", true, false, "Nova masina za ves. 800 obrtaja", "Srpsko Sarajevo", "065252515"));
				DataBaseItemProvider.AddItem(new Item(DataBaseUserProvider.FindUserByUsername("marko").Id, "Marko", "Arduino", "Elektronika", "nudim", "420", false, true, "Arduino plocica", "Srpsko Sarajevo", "065252515"));
			}

			if (DataBaseMarkProvider.RetrieveAllMarks().Count == 0)
			{
				User user = DataBaseUserProvider.FindUserById(DataBaseUserProvider.FindUserByUsername("admin").Id);
				double suma = user.ProsjecnaOcjena * user.BrOcjena;
				suma +=7;
				user.BrOcjena= user.BrOcjena+2;
				user.ProsjecnaOcjena = suma / user.BrOcjena;
				DataBaseUserProvider.UpdateUser(user);

				DataBaseMarkProvider.AddOcjena(new Ocjena("Prodavac je okej", 3, "petar", DataBaseUserProvider.FindUserByUsername("petar").Id, DataBaseUserProvider.FindUserByUsername("admin").Id));
				DataBaseMarkProvider.AddOcjena(new Ocjena("Prodavac je odlican, sve super", 4, "marko", DataBaseUserProvider.FindUserByUsername("marko").Id, DataBaseUserProvider.FindUserByUsername("admin").Id));

				User user2 = DataBaseUserProvider.FindUserById(DataBaseUserProvider.FindUserByUsername("petar").Id);
				double suma2 = user2.ProsjecnaOcjena * user2.BrOcjena;
				suma2 += 5;
				user2.BrOcjena = user2.BrOcjena + 2;
				user2.ProsjecnaOcjena = suma2 / user2.BrOcjena;
				DataBaseUserProvider.UpdateUser(user2);

				DataBaseMarkProvider.AddOcjena(new Ocjena("Nisam zadovoljan", 1, "admin", DataBaseUserProvider.FindUserByUsername("admin").Id, DataBaseUserProvider.FindUserByUsername("petar").Id));
				DataBaseMarkProvider.AddOcjena(new Ocjena("Vrlo dobra prodaja", 4, "marko", DataBaseUserProvider.FindUserByUsername("marko").Id, DataBaseUserProvider.FindUserByUsername("petar").Id));

			}
			if (DataBaseNotificationProvider.RetrieveAllObavjestenja().Count == 0)
			{
				DataBaseNotificationProvider.AddObavjestenje(new Obavjestenje(0, DataBaseUserProvider.FindUserByUsername("petar").Id, "petar", DataBaseUserProvider.FindUserByUsername("admin").Id, "admin", "zeli da kupi artikal", DataBaseItemProvider.FindItemByName("Golf 2").Id));
				DataBaseNotificationProvider.AddObavjestenje(new Obavjestenje(0, DataBaseUserProvider.FindUserByUsername("marko").Id, "marko", DataBaseUserProvider.FindUserByUsername("admin").Id, "admin", "zeli da kupi artikal", DataBaseItemProvider.FindItemByName("Xiaomi note 9").Id));

				DataBaseNotificationProvider.AddObavjestenje(new Obavjestenje(0, DataBaseUserProvider.FindUserByUsername("marko").Id, "marko", DataBaseUserProvider.FindUserByUsername("petar").Id, "petar", "zeli da kupi artikal", DataBaseItemProvider.FindItemByName("Fap 13").Id));
				DataBaseNotificationProvider.AddObavjestenje(new Obavjestenje(0, DataBaseUserProvider.FindUserByUsername("marko").Id, "marko", DataBaseUserProvider.FindUserByUsername("petar").Id, "petar", "zeli da kupi artikal", DataBaseItemProvider.FindItemByName("Stap za pecanje").Id));
			}

		}
	}
}
