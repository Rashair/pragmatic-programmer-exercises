namespace StateMachine
{
    public static class Extensions
    {
        /// <summary>
        /// https://stackoverflow.com/a/27073919/6841224
        /// </summary>
        public static string CaptaliseFirstLetter(this string str)
        {
            if (string.IsNullOrEmpty(str))
                return string.Empty;

            char[] a = str.ToCharArray();
            a[0] = char.ToUpper(a[0]);
            return new string(a);
        }
    }
}
