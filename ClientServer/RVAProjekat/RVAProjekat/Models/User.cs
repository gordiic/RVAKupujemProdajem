using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RVAProjekat.Models
{
	public class User
	{
		private int id;
		private string ime;
		private string prezime;
		private string korisnickoIme;
		private string lozinka;
		private string email;
		private string uloga;
		private double prosjecnaOcjena;
		private int brOcjena;
		private ICollection<Item> items;
		private ICollection<Ocjena> ocjene;
		private ICollection<Obavjestenje> obavjestenja;

		public User(string ime, string prezime, string korisnickoIme, string lozinka, string email,string uloga)
		{
			Ime = ime;
			Prezime = prezime;
			KorisnickoIme = korisnickoIme;
			Lozinka = lozinka;
			Email = email;
			Uloga = uloga;
		}
		public User()
		{

		}

		public int Id { get => id; set => id = value; }
		public string Ime { get => ime; set => ime = value; }
		public string Prezime { get => prezime; set => prezime = value; }
		public string KorisnickoIme { get => korisnickoIme; set => korisnickoIme = value; }
		public string Lozinka { get => lozinka; set => lozinka = value; }
		public string Email { get => email; set => email = value; }
		public string Uloga { get => uloga; set => uloga = value; }
		public double ProsjecnaOcjena { get => prosjecnaOcjena; set => prosjecnaOcjena = value; }
		public int BrOcjena { get => brOcjena; set => brOcjena = value; }
		public ICollection<Item> Items { get => items; set => items = value; }
		public ICollection<Ocjena> Ocjene { get => ocjene; set => ocjene = value; }
		public ICollection<Obavjestenje> Obavjestenja { get => obavjestenja; set => obavjestenja = value; }
	}
}
