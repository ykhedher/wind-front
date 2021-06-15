import { notification } from 'antd';

const openNotification = (type, message) => {
   notification[type]({
      message,
      placement: 'bottomRight',
   });
};


export { openNotification }