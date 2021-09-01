using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RVAProjekat.Models
{
	public class Ocjena
	{
		private int id;
		private string komentar;
		private int brOcjene;
		private string korisnickoIme;
		private int idKorisnika;
		private int? userId;
		private User user;
		public Ocjena(string komentar, int brOcjene, string korisnickoIme, int idKorisnika, int userId)
		{
			Komentar = komentar;
			BrOcjene = brOcjene;
			KorisnickoIme = korisnickoIme;
			IdKorisnika = idKorisnika;
			UserId = userId;
		}
		public Ocjena()
		{

		}

		public int Id { get => id; set => id = value; }
		public string Komentar { get => komentar; set => komentar = value; }
		public int BrOcjene { get => brOcjene; set => brOcjene = value; }
		public string KorisnickoIme { get => korisnickoIme; set => korisnickoIme = value; }
		public int IdKorisnika { get => idKorisnika; set => idKorisnika = value; }
		public int? UserId { get => userId; set => userId = value; }
		public User User { get => user; set => user = value; }
	}
}
