// AIGenerationService

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environment/environment';


// 定义接口类型来描述响应结构
interface TextGenerationResponse {
  output: {
    choices: [
      {
        finish_reason: string;
        message: {
          role: string;
          content: string;
        }
      }
    ];
  };
  usage: {
    total_tokens: number;
    output_tokens: number;
    input_tokens: number;
  };
  request_id: string;
}

@Injectable({
  providedIn: 'root'
})
export class AIGenerationService {
  public responseHistory: string[] = [];

  private apiUrl = environment.apiUrl;
  private apiKey = environment.apiKey;

  constructor(private http: HttpClient) { }

  // 定义方法并只返回 content 字段
  generateContent(message:string): Observable<string> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json'
    });

    const body = {
      "model": "qwen-max",
      "input": {
        "messages": [
          { "role": "system", 
            "content": "你是一名美食爱好者,每天都会和同事一起吃美食。同时，你是一个能够提供情绪价值的高手,你的特点喜欢说废话,但是能够给别人及时的情绪价值.我会给你一些话，你根据这些话给出100字以上的废话回复，然后在废话的末尾另起一段，段首为’事已至此，先吃饭吧。’，然后推荐一种今天去吃的美食。美食推荐的字数不少于100字" },
          { "content": `${message}`, 
            "role": "user" }
        ]
      },
      "parameters": {
        "temperature": 0.8,
        "seed": Math.floor(Math.random() * 100000),
        "result_format": "message"
      }
    };

    // 使用 map 操作符从响应中提取 content 字段
    return this.http.post<TextGenerationResponse>(this.apiUrl, body, { headers }).pipe(
      map(response => response.output.choices[0].message.content)
    );
  }
}
