from virtual_api import VirtualAPI

def test_api():
    api = VirtualAPI()
    
    print("\nTesting API endpoints...")
    print("========================")
    
    # List available markets
    print("\nListing markets:")
    markets = api.list_markets()
    if markets:
        print("Available markets:")
        print(markets)
    else:
        print("Failed to fetch markets")

if __name__ == "__main__":
    test_api()
