import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, AreaChart, Area } from "recharts";
import * as tf from "@tensorflow/tfjs";
import { motion } from "framer-motion";
import { FaChartLine, FaArrowUp, FaArrowDown, FaInfoCircle } from "react-icons/fa";

const PredictiveAnalytics = () => {
  const [investmentData, setInvestmentData] = useState([]);
  const [predictedData, setPredictedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confidence, setConfidence] = useState(0);
  const [trend, setTrend] = useState('neutral');

  useEffect(() => {
    // Get investments from localStorage
    const rawInvestments = JSON.parse(localStorage.getItem('investments')) || [];
    
    // Format the investments data
    const formattedInvestments = rawInvestments.map((inv, index) => ({
      amount: Number(String(inv.amount).replace(/[₹,]/g, '')),
      type: inv.type,
      returns: Number(String(inv.returns).replace('%', '')),
      // Add sequential dates for better prediction
      date: new Date(2023, index, 1).toISOString().split('T')[0]
    }));
  
    // Create time series data for better predictions
    const processedData = formattedInvestments.map((inv, index) => ({
      month: new Date(inv.date).toLocaleString('default', { month: 'short' }) + ' 2023',
      value: inv.amount * (1 + inv.returns / 100),
      type: inv.type
    }));
  
    console.log('Processed Investment Data:', processedData); // Debug log
  
    setInvestmentData(processedData);
    
    const trainModel = async () => {
      try {
        if (processedData.length < 2) {
          setPredictedData([]);
          setLoading(false);
          return;
        }

        const xs = processedData.map((_, index) => index);
        const ys = processedData.map(data => data.value);
        const lastIndex = xs[xs.length - 1]; // Add this line to define lastIndex

        const model = tf.sequential();
        model.add(tf.layers.dense({ units: 16, inputShape: [1], activation: 'relu' }));
        model.add(tf.layers.dense({ units: 8, activation: 'relu' }));
        model.add(tf.layers.dense({ units: 1 }));
        
        model.compile({ 
          optimizer: tf.train.adam(0.01),
          loss: 'meanSquaredError'
        });

        const xsTensor = tf.tensor2d(xs, [xs.length, 1]);
        const ysTensor = tf.tensor2d(ys, [ys.length, 1]);

        await model.fit(xsTensor, ysTensor, { 
          epochs: 200,
          callbacks: {
            onEpochEnd: (epoch, logs) => {
              if (epoch === 199) {
                setConfidence(Math.round((1 - logs.loss) * 100));
              }
            }
          }
        });

        const futurePredictions = [];
        const lastValue = ys[ys.length - 1];
        
        for (let i = 1; i <= 3; i++) {
          const prediction = await model.predict(tf.tensor2d([lastIndex + i], [1, 1])).data();
          const predictedValue = Math.max(0, prediction[0]);
          
          const date = new Date();
          date.setMonth(date.getMonth() + i);
          futurePredictions.push({
            month: date.toLocaleString('default', { month: 'short' }) + ' ' + date.getFullYear(),
            value: Math.round(predictedValue), // Round the predicted value
            isPredicted: true
          });
        }

        // Clean up tensors
        xsTensor.dispose();
        ysTensor.dispose();
        model.dispose();

        setTrend(futurePredictions[2].value > lastValue ? 'up' : 'down');
        setPredictedData(futurePredictions);
        setLoading(false);
      } catch (error) {
        console.error('Prediction error:', error);
        setLoading(false);
      }
    };

    trainModel();
  }, []);

  const allData = [...investmentData.map(d => ({ ...d, isPredicted: false })), ...predictedData];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-purple-700">AI Investment Analysis</h2>
          <div className="flex items-center space-x-2">
            <FaInfoCircle className="text-purple-500" />
            <span className="text-sm text-gray-600">AI Confidence: {confidence}%</span>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700"></div>
          </div>
        ) : investmentData.length < 2 ? (
          <div className="text-center py-8 text-gray-600">
            Add at least two investments to see predictions
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-purple-50 p-4 rounded-lg"
              >
                <h3 className="text-sm font-semibold text-purple-700 mb-2">Current Investment</h3>
                <div className="text-2xl font-bold text-purple-900">
                  ₹{investmentData[investmentData.length - 1].value.toLocaleString()}
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-purple-50 p-4 rounded-lg"
              >
                <h3 className="text-sm font-semibold text-purple-700 mb-2">Predicted Growth</h3>
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-purple-900">
                    {trend === 'up' ? '+' : ''}{((predictedData[2]?.value / investmentData[investmentData.length - 1].value - 1) * 100).toFixed(1)}%
                  </span>
                  {trend === 'up' ? (
                    <FaArrowUp className="ml-2 text-green-500" />
                  ) : (
                    <FaArrowDown className="ml-2 text-red-500" />
                  )}
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-purple-50 p-4 rounded-lg"
              >
                <h3 className="text-sm font-semibold text-purple-700 mb-2">3-Month Forecast</h3>
                <div className="text-2xl font-bold text-purple-900">
                  ₹{predictedData[2]?.value.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </div>
              </motion.div>
            </div>

            <div className="h-[400px] mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={allData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#7C3AED" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#7C3AED" 
                    fillOpacity={1}
                    fill="url(#colorValue)"
                    strokeWidth={2}
                    name="Investment Value"
                    dot={true}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Monthly Predictions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {predictedData.map((item, index) => (
                  <motion.div
                    key={item.month}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white p-4 rounded-lg shadow"
                  >
                    <div className="text-sm text-gray-600">{item.month}</div>
                    <div className="text-xl font-bold text-purple-600">
                      ₹{item.value.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </div>
                    <div className="text-sm text-gray-500">
                      {index === 0 ? 'Short-term' : index === 1 ? 'Mid-term' : 'Long-term'} prediction
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default PredictiveAnalytics;
