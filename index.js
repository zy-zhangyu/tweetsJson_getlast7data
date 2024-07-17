const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = process.env.PORT || 80;

// MongoDB 连接 URI
const uri = 'mongodb+srv://dubai52233:Aaqweqweqwe123@cluster0.5p8on8l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // 根据您的 MongoDB 配置修改

// 添加一个新的路由来查询最后7条数据
app.get('/getLast7Data', async (req, res) => {
    try {
        // 连接 MongoDB
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();

        const database = client.db('Blastai');
        const collection = database.collection('Blastai');

        // 查询集合中最后7条数据，按照 _id 倒序排序
        const last7Data = await collection.find().sort({ _id: -1 }).limit(7).toArray();

        await client.close();

        res.json(last7Data); // 将查询结果以 JSON 格式发送回客户端
    } catch (error) {
        res.status(500).json({ error: '发生错误：' + error.message });
    }
});

app.listen(port, () => {
    console.log(`服务器运行在 http://localhost:${port}`);
});
