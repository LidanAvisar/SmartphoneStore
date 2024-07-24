namespace SmartphoneStoreApi.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string? Company { get; set; }
        public string? Model { get; set; }
        public string? ScreenSize { get; set; }
        public string? StorageCapacity { get; set; }
        public string? Color { get; set; }
    }
}
