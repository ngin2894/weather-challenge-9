import { Router, type Request, type Response } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', (req: Request, res: Response) => {
  const { city } = req.body;

  // TODO: GET weather data from city name
  try {
    const weatherData = await WeatherService.getWeatherForCity(city);
    await HistoryService.addCity(city);

    // TODO: save city to search history
  } catch (error) {
    return res.status(500).json({ error: 'Failed to retrieve weather data' });
  }
});

// TODO: GET search history
router.get('/history', async (req: Request, res: Response) => {
  try {
    const history = await HistoryService.getCities(); 
    return res.status(200).json(history); 
  } catch (error) {
    return res.status(500).json({ error: 'Failed to retrieve search history' }); // Handle errors
  }
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => { });

export default router;
