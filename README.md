# TechMate - Social Media Performance Analyzer 🤖  

TechMate is a lightweight and interactive social media analytics bot designed to provide quick insights into social media post performance. It integrates Langflow, DataStax Astra DB, and GPT to analyze engagement data and suggest strategies for improving engagement.

[Try CHAT-BOT](https://pre-hackathon-assignment-level-super-mind.vercel.app/)

## 🎯 Objective  

The goal of this project is to create a social media analytics module capable of:  
- Fetching and analyzing mock social media engagement data.  
- Offering data-driven insights on post performance.  
- Suggesting actionable strategies using GPT.  

## 🚀 Features  

- **Engagement Analysis**: Analyze mock social media engagement data, including likes, shares, and comments.  
- **Post Insights**: Determine the performance of various post types (e.g., reels, carousels, static images).  
- **Quick Prompts**: Predefined queries for faster insights, such as:  
  - "Tell me about the best post type!"  
  - "Which post has the highest engagement?"  
  - "Any strategy to boost engagement?"  
- **Real-Time Suggestions**: Powered by GPT for strategy recommendations.  
- **User-Friendly UI**: Built with ShadCN components and styled using Tailwind CSS.  

## 🛠️ Tech Stack  

- **Frontend**: React, Tailwind CSS, ShadCN UI components  
- **Backend**: Node.js with Axios-based API utility  
- **Database**: DataStax Astra DB for storing and querying mock data  
- **Workflow**: Langflow for workflow creation and GPT integration  

## 📂 Project Structure  

- **Frontend**: Handles user interactions and data visualization using React.  
- **Backend**: API utility connects to the DataStax Astra DB and handles Langflow workflows.  
- **Database**: Stores mock engagement data for analysis.  

## 📑 How It Works  

1. **Data Storage**:  
   - Mock data simulating social media engagement is stored in DataStax Astra DB.  

2. **Insights Generation**:  
   - Langflow workflows query the database and calculate metrics.  
   - GPT is integrated into Langflow to generate insights like:  
     - "Carousel posts have 20% higher engagement than static posts."  
     - "Reels drive 2x more comments compared to other formats."  

3. **UI Interactions**:  
   - Users can interact via a responsive web app to view insights and submit queries.  

## 💡 Key Components  

### Quick Prompts  
Buttons for predefined queries to streamline the user experience.  

### Chat Interface  
Interactive chat interface where users can type or select prompts and receive insights.  

## 📽️ Demo Videos  

- **Langflow & Project Overview**: [YouTube Demo](#)  
 
## 🔗 Links  
- [Try TechMate](https://pre-hackathon-assignment-level-super-mind.vercel.app/).
- [GitHub Repository](https://github.com/KRSNAGUPTA/preHackathon-assignment-level-superMind)  
- [Langflow Documentation](https://langflow-docs.com)  
- [DataStax Astra DB](https://www.datastax.com/astra)  

## 🙌 Acknowledgments  

This project was submitted as part of the **Pre-Hackathon Assignment** for the **Level Supermind Hackathon**.  

---

**Built with ❤️ by Team TechMate**  
