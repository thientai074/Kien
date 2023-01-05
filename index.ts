import express, {Application} from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import {logger, morganOption} from "./logger/winston";
import helmet from "helmet";
import cors from "cors";
import {env} from "./src/utils/MyVariables";
import {useRoute} from "./src/route/AppRoute";
import SettingGame from "./src/model/SettingGame";

//Init config server
const app: Application = express();
const port = 8083;

//Create server
app.listen(port, (): void => {
    logger.debug('Server đã khởi động trên cổng: ' + port);
});


//lọc các HTTP header độc hại
app.use(helmet());
//Sử dụng cors
app.use(cors());
mongoose.set('strictQuery', false);
//Logger
app.use(morgan('combined', morganOption));

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// mongodb connection
const url = "mongodb://" + env.dbUserName + ":" + env.dbPassword + "@" + env.dbHostName + ":" + env.dbPort + "/" + env.dbName + "";


mongoose.set('autoCreate', true);

mongoose.connect(url)
    .then(async () => {
        logger.debug(`Đã kết nối db thành công!`);
        //Check settinggame, nếu chưa tồn tại bản ghi nào thì thêm mới bản ghi mặc định
        const itemFind = await SettingGame.findOne();
        if (!itemFind) {
            // HungHV thêm mới endEvent là ngày kết thúc sự kiện là 31/10/2022 lúc 00:00
            const itemCreate = new SettingGame({
                name: 'Mặc định',
                playTime: 60,
                playLife: 3,
                appearGhost: 10,
                stopGame: false,
                isDefault: true,
                endEvent: new Date('10/31/2022 00:00')
            });
            //Lưu db
            await itemCreate.save();
            logger.debug(`Đã thêm setting game thành công!`);
        }

    })
    .catch(err => {
        logger.error(`Lỗi khi kết nối db: ${err}`);
    })

//Use Route
useRoute(app);
