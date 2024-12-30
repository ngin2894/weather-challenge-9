import fs from 'fs/promises';

// TODO: Define a City class with name and id properties
class City {
  constructor(public id: string, public name: string) {}
}

// TODO: Complete the HistoryService class
class HistoryService {
  private filePath = './searchHistory.json';
  // TODO: Define a read method that reads from the searchHistory.json file
  // private async read() {}
  private async read(): Promise<City[]> {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      const cities = JSON.parse(data);
      return cities.map((city: { id: string; name: string }) => new City(city.id, city.name));
    } catch (error) {
      return []; 
    }
  }
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  // private async write(cities: City[]) {}
  private async write(cities: City[]): Promise<void> {
    await fs.writeFile(this.filePath, JSON.stringify(cities, null, 2));
  }

  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  // async getCities() {}
  async getCities(): Promise<City[]> {
    return await this.read();
  }
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  // async addCity(city: string) {}
  async addCity(cityName: string): Promise<void> {
    const cities = await this.read();
    const newCity = new City((cities.length + 1).toString(), cityName); // Generate a simple ID
    cities.push(newCity);
    await this.write(cities);
  }

  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  // async removeCity(id: string) {}
  async removeCity(id: string): Promise<void> {
    const cities = await this.read();
    const updatedCities = cities.filter(city => city.id !== id);
    await this.write(updatedCities);
  }
}

export default new HistoryService();
