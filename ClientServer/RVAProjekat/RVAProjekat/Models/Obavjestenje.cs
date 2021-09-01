using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RVAProjekat.Models
{
	public class Obavjestenje
	{
		private int id;
		private int odkogaId;
		private string odkogaIme;
		private string opis;
		private int idArtikla;
		private string komeIme;
		private int? userId;
		private User user;

		public Obavjestenje(int id, int odkogaId, string odkogaIme, int userId, string komeIme, string opis, int idArtikla)
		{
			Id = id;
			OdkogaId = odkogaId;
			OdkogaIme = odkogaIme;
			Opis = opis;
			IdArtikla = idArtikla;
			UserId = userId;
			KomeIme = komeIme;
		}

		public Obavjestenje()
		{

		}

		public int Id { get => id; set => id = value; }
		public int OdkogaId { get => odkogaId; set => odkogaId = value; }
		public string OdkogaIme { get => odkogaIme; set => odkogaIme = value; }
		public string Opis { get => opis; set => opis = value; }
		public int IdArtikla { get => idArtikla; set => idArtikla = value; }
		public int? UserId { get => userId; set => userId = value; }
		public User User { get => user; set => user = value; }
		public string KomeIme { get => komeIme; set => komeIme = value; }
	}
}
