import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AIGenerationService } from './aigeneration.service';
import { environment } from '../../environment/environment';

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

  it('should return generated content', () => {
    const dummyResponse = {
      output: {
        choices: [
          {
            finish_reason: 'stop',
            message: {
              role: 'assistant',
              content: '这是一个高情商的回复'
            }
          }
        ]
      },
      usage: {
        total_tokens: 10,
        output_tokens: 5,
        input_tokens: 5
      },
      request_id: '12345'
    };

    service.generateContent().subscribe(content => {
      expect(content).toBe('这是一个高情商的回复');
    });

    const req = httpMock.expectOne(environment.apiUrl);
    expect(req.request.method).toBe('POST');
    req.flush(dummyResponse);
  });
});
