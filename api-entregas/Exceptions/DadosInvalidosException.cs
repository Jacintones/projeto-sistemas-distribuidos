namespace api_entregas.Exceptions
{
    public class DadosInvalidosException : ApplicationException
    {
        public DadosInvalidosException(string mensagem)
            : base(mensagem) { }
    }
}
