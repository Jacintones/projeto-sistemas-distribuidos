namespace api_entregas.Exceptions
{
    public class ErroInternoException : ApplicationException
    {
        public ErroInternoException(string mensagem, Exception? inner = null)
            : base(mensagem, inner) { }
    }
}
