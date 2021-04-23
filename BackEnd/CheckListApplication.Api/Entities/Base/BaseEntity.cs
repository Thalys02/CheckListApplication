using System;

namespace CheckListApplication.Api.Entities.Base
{
    public class BaseEntity
    {
        public Guid Id { get; set; }
        public DateTime DataInclusao { get; set; } = DateTime.Now;
        public DateTime? DataAlteracao { get; set; }
    }
}
