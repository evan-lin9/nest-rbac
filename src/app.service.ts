import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { IResponse } from './app.interface';

@Injectable()
export class AppService {
  async getHello(): Promise<any> {
    // 获取uid
    const dynamic_id = '499627472461569299';
    const {
      data: { data },
    }: any = await axios({
      url: `https://api.vc.bilibili.com/dynamic_svr/v1/dynamic_svr/get_dynamic_detail?dynamic_id=${dynamic_id}`,
    });
    const uid = data.card.desc.rid;

    // 请求每页动态数据, 返回处理后的结果和是否继续处理
    const help = async (pn: number, map) => {
      const res = await axios({
        url: 'https://api.bilibili.com/x/v2/reply',
        params: {
          jsonp: 'jsonp',
          oid: uid,
          type: 11, // 无转发动态的类型 固定值
          pn, // 页数
          sort: 2, // 1 按时间排序 2 按热度排序
        },
      });
      const { page, replies } = res.data.data as IResponse;
      replies.forEach((reply) => {
        const { mid, like, member } = reply;
        if (!(map.has(mid) && map.get(mid).like > like)) {
          map.set(mid, { mid, like, uname: member.uname });
        }
      });
      // 请求完返回分页数为-1
      if (page.num * page.size > page.acount) {
        return [-1, map];
      } else {
        return [page.num + 1, map];
      }
    };
    const map = new Map();
    let pn = 1;
    while (pn > 0) {
      const [currPage, _] = await help(pn, map);
      pn = currPage;
    }
    const list = [];
    let maxLikes = 0; // 最多点赞数
    for (const value of map.values()) {
      maxLikes = Math.max(maxLikes, value.like);
      list.push(value);
    }

    // 按照点赞数+1, 将用户id存入一个队列
    const queue = [];
    list.forEach((i) => {
      queue.push(...new Array(i.like + 1).fill(i.mid));
    });

    // 再使用洗牌算法，打算队列
    const shuffle = (arr: string[]) => {
      let n = arr.length,
        random;
      while (0 !== n) {
        random = (Math.random() * n--) >>> 0;
        [arr[n], arr[random]] = [arr[random], arr[n]];
      }
      return arr;
    };

    // 根据最大点赞数取出中奖者
    const win = shuffle(queue)[maxLikes];
    return {
      win: map.get(win),
      maxLikes: list.find((i) => i.like === maxLikes),
    };
  }
}
