import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environment/environment';
import { AIGenerationService } from './aigeneration.service';

describe('AIGenerationService', () => {
  let service: AIGenerationService;
  let httpMock: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AIGenerationService]
    });
    service = TestBed.inject(AIGenerationService);
    httpMock = TestBed.inject(HttpTestingController);
  });


  afterEach(() => {
    httpMock.verify();
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should generate content', () => {
    const dummyResponse = {
      output: {
        choices: [
          {
            finish_reason: 'stop',
            message: {
              role: 'assistant',
              content: '推荐的美食是寿司。'
            }
          }
        ]
      },
      usage: {
        total_tokens: 100,
        output_tokens: 50,
        input_tokens: 50
      },
      request_id: '12345'
    };


service.generateContent('推荐美食').subscribe(response => {
  expect(response).toBe('推荐的美食是寿司。');
});

const req = httpMock.expectOne(environment.apiUrl);
expect(req.request.method).toBe('POST');
req.flush(dummyResponse);

  });
});