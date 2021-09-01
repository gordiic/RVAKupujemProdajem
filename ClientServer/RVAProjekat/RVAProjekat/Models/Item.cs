using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;

namespace RVAProjekat.Models
{
	public class Item
	{
		private string userName;
		private int id;
		private string naslov;
		private string kategorija;
		private string nudimTrazim;
		private string cijena;
		private bool fiksno;
		private bool prihvatamZamjenu;
		private string tekstOglasa;
		private string mjestoGrad;
		private string telefon;
		private int? userId;
		private User user;

		public Item(int userId, string userName, string naslov, string kategorija, string nudimTrazim, string cijena, bool fiksno, bool prihvatamZamjenu, string tekstOglasa, string mjestoGrad, string telefon)
		{
			this.UserId = userId;
			this.userName = userName;
			this.naslov = naslov;
			this.kategorija = kategorija;
			this.nudimTrazim = nudimTrazim;
			this.cijena = cijena;
			this.fiksno = fiksno;
			this.prihvatamZamjenu = prihvatamZamjenu;
			this.tekstOglasa = tekstOglasa;
			this.mjestoGrad = mjestoGrad;
			this.telefon = telefon;
		}
		public Item()
		{

		}
		public int Id { get => id; set => id = value; }
		public string UserName { get => userName; set => userName = value; }
		public string Naslov { get => naslov; set => naslov = value; }
		public string Kategorija { get => kategorija; set => kategorija = value; }
		public string NudimTrazim { get => nudimTrazim; set => nudimTrazim = value; }
		public string Cijena { get => cijena; set => cijena = value; }
		public bool Fiksno { get => fiksno; set => fiksno = value; }
		public bool PrihvatamZamjenu { get => prihvatamZamjenu; set => prihvatamZamjenu = value; }
		public string TekstOglasa { get => tekstOglasa; set => tekstOglasa = value; }
		public string MjestoGrad { get => mjestoGrad; set => mjestoGrad = value; }
		public string Telefon { get => telefon; set => telefon = value; }
		public int? UserId { get => userId; set => userId = value; }
		public User User { get => user; set => user = value; }

		//private File dodajteSlike;


	}
}
